async function fetchWithTimeout(url: string, timeout = 3000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      console.log(`unable to access：${url}`, error);
      return null;
    }
  }
  
  export default async function handler(req: NextRequest) {
    const url = new URL(req.url);
    const r2CustomDomain = "https://blog-static.xeonzilla.top";
    const r2DevDomain = "https://pub-ad6587f33c84458780691bb4e88b57c1.r2.dev";
  
    const cloudflareResponse = await fetchWithTimeout(r2CustomDomain + url.pathname);
    if (cloudflareResponse && cloudflareResponse.ok) {
      return cloudflareResponse;
    }
  
    console.log("inaccessible cdn，fallback to R2.dev");
  
    return fetch(r2DevDomain + url.pathname);
  }
  