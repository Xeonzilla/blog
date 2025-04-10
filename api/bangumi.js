const axios = require("axios");

module.exports = async (req, res) => {
    const { username, type = 'watching' } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Missing Bangumi username" });
    }

    const TYPE_MAP = {
        wish: 1,
        watching: 2,
        completed: 3
    };

    const typeValue = TYPE_MAP[type];
    if (!typeValue) {
        return res.status(400).json({ error: "Invalid type" });
    }

    try {
        const response = await axios.get(`https://api.bgm.tv/v0/users/${username}/collections`, {
            params: {
                subject_type: 2,
                type: typeValue,
                limit: 100
            },
            headers: { 'User-Agent': 'HCLonely/hexo-bilibili-bangumi' }
        });

        const data = (response.data?.data || []).map(item => ({
            id: item.subject.id,
            title: item.subject.name,
            chinese_title: item.subject.name_cn,
            cover: item.subject.images?.large || '',
            eps: item.subject.eps,
            progress: item.ep_status,
            url: `https://bgm.tv/subject/${item.subject.id}`
        }));

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).json(data);
    } catch (error) {
        console.error(error?.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch Bangumi data" });
    }
};
