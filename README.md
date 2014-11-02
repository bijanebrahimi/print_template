## Print Template (Jquery Plugin)


    $(".cheque-example-1").print_template({
      img: "assets/img/Check_Melli_p.png",
      objects: [{id:"from_account_number", caption:"From Acc"},
                {id:"to_account", caption:"To Account"},
                {id:"price_numeric", caption:"Price (num)"},
                {id:"price_alphabetic", caption:"Price (alpha)"},
                {id:"date_numeric", caption:"Date (num)"},
                {id:"date_alphabetic", caption:"Date (alpha)"}]
    })


![Print Template](https://raw.githubusercontent.com/bijanebrahimi/print_template/master/screenshot.png?raw=true "Optional Title")

You can also initiate the plugin with default positions:

    $(".cheque-example-2").print_template({
      img: "assets/img/Check_Melli_p.png",
      objects: [{id:"from_account_number", caption:"From Acc", top:242, left:246, width:247, height:24},
                {id:"to_account", caption:"To Account", top:167, left:137, width:397, height:24},
                {id:"price_numeric", caption:"Price (num)", top:134, left:75, width:407, height:24},
                {id:"price_alphabetic", caption:"Price (alpha)", top:206, left:426, width:136, height:24},
                {id:"date_numeric", caption:"Date (num)", top:96, left:499, width:71, height:24},
                {id:"date_alphabetic", caption:"Date (alpha)", top:95, left:230, width:208, height:24}]
    })

After moving the draggables in the right places you can get their positions
with `toArray` method:

    console.log($(".cheque-example-2").print_template('toArray'))
    > [{id:"from_account_number", caption:"From Acc", top:242, left:246, width:247, height:24},
            {id:"to_account", caption:"To Account", top:167, left:137, width:397, height:24},
            {id:"price_numeric", caption:"Price (num)", top:134, left:75, width:407, height:24},
            {id:"price_alphabetic", caption:"Price (alpha)", top:206, left:426, width:136, height:24},
            {id:"date_numeric", caption:"Date (num)", top:96, left:499, width:71, height:24},
            {id:"date_alphabetic", caption:"Date (alpha)", top:95, left:230, width:208, height:24}]
