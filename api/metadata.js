export default (req, res) => {


    const metadataID = req.query.id;

    const respLookup = {
        1 :{ 
            name: "Golden Ticket",
            description: "Golden ticket to the Froggerinos game league",
            image_url: "https://leaguewon.vercel.app/leaguewon_gold.png",
            "Game": "Froggerinos",
            league_id: 1,
            "League": "Season 1",
            "Tier": 'Golden' 
        },
        2 : {
            name: "Silver Ticket",
            description: "Silver ticket to the Froggerinos game league",
            image_url: "https://leaguewon.vercel.app/leaguewon_silver.png",
            "Game": "Froggerinos",
            league_id: 1,
            "League": "Season 1",
            "Tier": 'Silver' 
        },
        3 : {
            name: "Bronze Ticket",
            description: "Bronze ticket to the Froggerinos game league",
            image_url: "https://leaguewon.vercel.app/leaguewon_bronze.png",
            "Game": "Froggerinos",
            league_id: 1,
            "League": "Season 1",
            "Tier": 'Bronze' 
        },
        4: {
            name: "Basic Ticket",
            description: "Basic ticket to the Froggerinos game league",
            image_url: "https://leaguewon.vercel.app/leaguewon_basic.png",
            "Game": "Froggerinos",
            league_id: 1,
            "League": "Season 1",
            "Tier": 'Basic' 
        }
    }

    const respToSend = respLookup[metadataID]

    res.json(respToSend)

}