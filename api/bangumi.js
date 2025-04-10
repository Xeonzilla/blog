/**
 * Converts an object into a URL query string.
 * Example: { a: 1, b: "test", c: null } -> "a=1&b=test"
 * @param {object} params - The object to convert.
 * @returns {string} The URL query string.
 */
function buildQueryString(params) {
    return Object.entries(params)
        .filter(([, value]) => !!value) // Filter out falsy values
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Encode values for URL safety
        .join("&");
}

/**
 * Parses URL search parameters into an object.
 * @param {URL} url - The URL object.
 * @returns {object} An object containing the search parameters.
 */
function parseUrlSearchParams(url) {
    return Object.fromEntries(
        Array.from(url.searchParams.entries())
            .filter(([, value]) => !!value) // Filter out empty values if needed, though usually handled by API
    );
}

/**
 * Creates a standard JSON Response object.
 * Sets the HTTP status code based on responseData.code.
 * @param {object} responseData - The data payload, should include a 'code' property.
 * @param {number} responseData.code - The HTTP status code.
 * @param {string} responseData.message - A descriptive message.
 * @param {object} responseData.data - The actual data.
 * @returns {Response} A Response object.
 */
function createJsonResponse(responseData) {
    // Ensure headers allow CORS if needed, and set content type
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust CORS policy as needed
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };
    return Response.json(responseData, { status: responseData.code, headers: headers });
}

// --- Bangumi API Mappings ---

// Maps local subject type codes to Bangumi API subject_type codes
// 1: Anime, 2: Game, 3: Book
const BANGUMI_SUBJECT_TYPE_MAP = { 1: "2", 2: "4", 3: "1" };

// Maps local collection type codes to Bangumi API type codes
// 0: All, 1: Want, 2: Doing, 3: Done
const BANGUMI_COLLECTION_TYPE_MAP = { 0: null, 1: "1", 2: "3", 3: "2" };

/**
 * Fetches and processes collection data for a user from the Bangumi API.
 * @param {object} queryParams - Parsed query parameters.
 * @param {string} [queryParams.subjectType="1"] - Type of subject (1: Anime, 2: Game, 3: Book).
 * @param {string} queryParams.uid - The Bangumi user ID (required).
 * @param {string} [queryParams.collectionType="0"] - Collection status (0: All, 1: Want, 2: Doing, 3: Done).
 * @param {number} [queryParams.pageNumber=1] - Page number.
 * @param {number} [queryParams.pageSize=10] - Items per page.
 * @param {object} env - Environment variables (e.g., process.env).
 * @returns {Promise<Response>} A promise resolving to a JSON Response object.
 */
async function fetchBangumiCollections(queryParams, env) {
    // Destructure parameters with defaults
    const {
        subjectType: subjectTypeCode = "1",
        uid, // UID from query takes precedence
        collectionType: collectionTypeCode = "0",
        pageNumber = 1,
        pageSize = 10
    } = queryParams;

    // Determine the Bangumi UID: use query param 'uid' first, then env variable 'BGM'
    const bangumiUid = uid !== null && uid !== void 0 ? uid : env === null || env === void 0 ? void 0 : env.BGM;

    // Validate UID presence
    if (!bangumiUid) {
        return createJsonResponse({ code: 400, message: "Bangumi user ID (uid) is required", data: {} });
    }

    // Map local types to Bangumi API parameters
    const apiSubjectType = BANGUMI_SUBJECT_TYPE_MAP[subjectTypeCode];
    const apiCollectionType = BANGUMI_COLLECTION_TYPE_MAP[collectionTypeCode];

    // Construct query parameters for the Bangumi API request
    const bgmApiQueryString = buildQueryString({
        subject_type: apiSubjectType,
        type: apiCollectionType, // Bangumi API uses 'type' for collection status
        limit: pageSize,
        offset: (Number(pageNumber) - 1) * Number(pageSize)
    });

    const apiUrl = `https://api.bgm.tv/v0/users/${bangumiUid}/collections?${bgmApiQueryString}`;
    const userAgent = "yixiaojiu/bilibili-bangumi-component (https://github.com/yixiaojiu/bilibili-bangumi-component)"; // Identify client

    console.log(`Fetching Bangumi data: ${apiUrl}`); // Optional: log the request URL

    try {
        // Perform the fetch request to Bangumi API
        const fetchResponse = await fetch(apiUrl, {
            headers: { 'User-Agent': userAgent }
        });

        // Parse the JSON response body
        const apiResult = await fetchResponse.json();

        // Check if the API call was successful
        if (fetchResponse.ok) {
            // Format the successful response
            const formattedData = formatBangumiApiResponse(apiResult, { pageNumber: Number(pageNumber), pageSize: Number(pageSize) });
            return createJsonResponse({ code: 200, message: "OK", data: formattedData });
        } else {
            // Handle API errors reported by Bangumi
            console.error(`Bangumi API Error (${fetchResponse.status}): ${apiResult.description || fetchResponse.statusText}`);
            return createJsonResponse({
                code: fetchResponse.status, // Use actual status code from Bangumi
                message: apiResult.description || `Bangumi API error (${fetchResponse.status})`,
                data: {}
            });
        }
    } catch (error) {
        // Handle network errors or issues during fetch/parsing
        console.error("Error fetching from Bangumi:", error);
        return createJsonResponse({ code: 500, message: 'Internal Server Error fetching data from Bangumi', data: {} });
    }
}

/**
 * Formats the raw Bangumi API response data into a structured format.
 * @param {object} apiData - The raw data object from the Bangumi API (parsed JSON).
 * @param {object} paginationParams - Contains pageNumber and pageSize.
 * @param {number} paginationParams.pageNumber - Current page number.
 * @param {number} paginationParams.pageSize - Items per page.
 * @returns {object} Formatted data including list and pagination info.
 */
function formatBangumiApiResponse(apiData, paginationParams) {
    const list = (apiData?.data || []).map(collectionItem => {
        const subject = collectionItem?.subject;
        if (!subject) return null; // Skip if subject data is missing

        // Create an array of labels with relevant information
        const labels = [
            // Only add label if value exists
            (subject.eps) ? { label: `${subject.eps}\u8BDD` } : null, // Episodes (话)
            (subject.score) ? { label: "\u8BC4\u5206", value: subject.score } : null, // Score (评分)
            (subject.rank) ? { label: "\u6392\u540D", value: subject.rank } : null, // Rank (排名)
            (subject.date) ? { label: "\u65F6\u95F4", value: subject.date } : null, // Release date (时间)
        ].filter(label => label !== null); // Remove null entries

        return {
            name: subject.name, // Original name
            nameCN: subject.name_cn || subject.name, // Chinese name (fallback to original)
            summary: subject.short_summary || "", // Short summary
            cover: subject.images?.large || subject.images?.common || subject.images?.medium || "", // Cover image URL (try different sizes)
            url: subject.id ? `https://bgm.tv/subject/${subject.id}` : "https://bgm.tv/", // Link to subject page
            labels: labels, // Array of {label, value?} objects
        };
    }).filter(item => item !== null); // Filter out any null items from mapping

    return {
        list: list,
        ...paginationParams, // Include pageNumber, pageSize
        total: apiData.total || 0, // Total number of items from API
        totalPages: Math.ceil((apiData.total || 0) / paginationParams.pageSize) // Calculate total pages
    };
}

/**
 * Normalizes pagination parameters, ensuring pageNumber and pageSize are numbers.
 * Provides default values if they are missing or invalid.
 * @param {object} params - The object containing potential pagination params.
 * @returns {object} The params object with pageNumber and pageSize as numbers.
 */
function normalizePaginationParams(params) {
    const pageNumber = Number(params.pageNumber) || 1;
    const pageSize = Number(params.pageSize) || 10;
    return {
        ...params,
        pageNumber: pageNumber > 0 ? pageNumber : 1, // Ensure positive page number
        pageSize: pageSize > 0 ? pageSize : 10, // Ensure positive page size
    };
}

// --- Edge Function Configuration ---
const RUNTIME = "edge"; // Specifies the Vercel Edge Runtime
const PREFERRED_REGIONS = ["hkg1", "hnd1", "kix1", "sin1"]; // Optional: preferred deployment regions

// --- Main Request Handler (Entry Point) ---
/**
 * Handles incoming GET requests. Routes requests based on path.
 * Currently only handles '/bgm'.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} A promise resolving to a JSON Response object.
 */
async function handleGetRequest(request) {
    const url = new URL(request.url);

    // Handle OPTIONS requests for CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204, // No Content
            headers: {
                'Access-Control-Allow-Origin': '*', // Or restrict to specific origins
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type', // Add any other headers your client might send
                'Access-Control-Max-Age': '86400', // Cache preflight response for 1 day
            },
        });
    }

    // Only process GET requests further
    if (request.method !== 'GET') {
        return createJsonResponse({ code: 405, message: 'Method Not Allowed', data: {} });
    }

    // Parse and normalize query parameters from the URL
    const queryParams = normalizePaginationParams(parseUrlSearchParams(url));

    // Routing based on pathname
    if (url.pathname.endsWith("/bgm")) {
        // Call the Bangumi handler function, passing query params and environment variables
        return await fetchBangumiCollections(queryParams, process.env);
    } else {
        // Return 404 Not Found for any other path
        return createJsonResponse({ code: 404, message: "Not Found", data: {} });
    }
}

// Export the handler for GET requests and edge configuration
export {
    handleGetRequest as GET, // Export main handler as GET endpoint
    PREFERRED_REGIONS as preferredRegion,
    RUNTIME as runtime
};