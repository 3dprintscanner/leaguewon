export default (req, res) => {


    const id = req.query.id;
    const league = req.query && req.query.leagueid
    const respLookup = {
        1 : { 
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
    let respToSend = null;
    if (league == 1){
        if(id <= 5){
            respToSend = respLookup[1]
        }else if(id >=6 && id <= 20){
            respToSend = respLookup[2]
        }else if(id >=21 && id <= 40){
            respToSend = respLookup[3]
        }else{
            respToSend = respLookup[4]
        }
    }


    res.json(respToSend)

}