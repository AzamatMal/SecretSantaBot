const TelegramBot = require("node-telegram-bot-api")
const token = process.env.TOKEN;
const bot = new TelegramBot(token,{polling:true})

let players = {
  }

bot.onText(/hello/,(msg,match)=>{
    console.log({
        chat:msg.chat.id,
        user:msg.chat.username,
        match
    })

    bot.sendMessage(msg.chat.id, 'Бзиара шэымаз',{
        "reply_markup":{
            "keyboard":[
                ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
            ]
        }
    })
    })

bot.onText(/Cалахәхар сҭахәуп/,(msg,match)=>{
    
    players[msg.chat.id] = {
        name:msg.chat.username,
        first_name:msg.chat.first_name,
        last_name:msg.chat.last_name,
        id:msg.chat.id,
        recipient:null
    }
    console.log(players)
bot.sendMessage(msg.chat.id,'Уажәшьҭа уалахәуп',{
    "reply_markup":{
        "keyboard":[
            ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
        ]
    }
})
})

bot.onText(/Алахәхара сахьхәит/,(msg,match)=>{
    
    delete players[msg.chat.id]
    console.log(players)
bot.sendMessage(msg.chat.id,'Уаҳа уалахәӡам',{
    "reply_markup":{
        "keyboard":[
            ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
        ]
    }
})
})

bot.onText(/Show everyone/,(msg,match)=>{
    
    console.log(players)
bot.sendMessage(msg.chat.id,'Все участники:'+JSON.stringify(players),{
    "reply_markup":{
        "keyboard":[
            ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
        ]
    }
})
})

bot.onText(/Delete everyone/,(msg,match)=>{
    
    players = {}
    console.log(players)
bot.sendMessage(msg.chat.id,'И никого не стало',{
    "reply_markup":{
        "keyboard":[
            ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
        ]
    }
})
})

bot.onText(/Аҳамҭа зысҭода?/,(msg,match)=>{
    
  let pl = Object.values(players)

  if(pl.length != 8)
        return bot.sendMessage(msg.chat.id,'Макьана зегьы рнапы аҵармыҩӡацт',{
            "reply_markup":{
                "keyboard":[
                    ['Cалахәхар сҭахәуп','Алахәхара сахьхәит','Аҳамҭа зысҭода?']
                ]
            }
        })

    pl.reduce((prev_player, current_player)=>{
        current_player.recipient = {...prev_player}
        bot.sendMessage(current_player.id,`Аҳамҭа иуҭоит:${current_player.recipient.first_name}${current_player.recipient.last_name}`)
        return {...current_player}
    },pl[pl.length-1])
    console.log(players)
})