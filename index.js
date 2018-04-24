/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const chemicalEquation=require('chemical-equation-balancer');
const chemicalFormula = require('chemical-formula');





//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
// const APP_ID = undefined;

const SKILL_NAME = 'Piece Of Pi';

const HELP_MESSAGE = 'You can use me for looking up math formulas ranging from trignometry, geometry, algebra to logarithm,  or, you can  balance chemical equations.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//data associated with queries
//=========================================================================================================================================

const QUERY_MSG=
[
    ". would you like to ask more formulas? ",
    ". would you like help with anything else? "
    

];

const sorryMsg=
[
    "Sorry I did not get that. Could you say that again? ",
    "Can you repeat that please ?",
    "Sorry I did not understand that. Can you repeat?",
    "What was that again ?",
    "Yeah, No I didn't get that. Please repeat that?"
];

//math egs
const MATH_EG=
[
    " expand cos two a.",
    " expand sine a plus b",
    " area of trapezoid ",
    " volume of cube ",
    " expand log a times b",
    " expand tan two x. ",
    " expand log a times b"
];

//chemistry egs
const CHEM_EG=
[
    " balance N.a plus C.l. two gives N.a.c.l.",
    " balance this sodium plus chlorine gives sodium chloride",
    " balance carbon plus oxygen gives carbon dioxide",
    " C. plus O. two gives C.O. two"

];

//combined egs
const COMB_EG=
[
    " expand cos two a.",
    " expand sine a plus b",
    " area of trapezoid ",
    " volume of cube ",
    " expand log a times b",
    " expand tan two x. ",
    " expand log a times b",
    " balance N.a plus C.l. two gives N.a.c.l.",
    " balance this sodium plus chlorine gives sodium chloride",
    " balance carbon plus oxygen gives carbon dioxide",
    " C. plus O. two gives C.O. two"

]
//;shapes
const shapeData=
{
    "Triangle":
    {
        Area : ["area of a triangle is half of base times height"],
        Perimeter : ["sum of its sides,duh","it has 3 sides , just add them"]
    },
    "Square":
    {
        Area : ["area of a square is , well , square of its side","area of a square is given by the square of its side"],
        Perimeter : [" four times its side's length","perimeter of a square is given by four times length of its side"]
    },
    "Cube":
    {
        Area : ["six times the length of an edge squared","the surface area of a cube is given by six times the length of one of it's edge squared"],
        Volume :["the volume of a cube is the length of its side cubed","its a cube, cube its side to get its volume"]
    },
    "Circle":
    {
        Area : ["pi times the radius squared","pi r. squared","the area of the circle is pi times the square of its radius"],
        Perimeter : ["the perimeter of the circle is two times pi times its radius ","the circumference of the circle is two pi times its radius"]
    },
    "Rectangle":
    {
        Area :["the area of a rectangle is its length times its breadth"],
        Perimeter :["the perimeter of a rectangle is length plus breadth the whole times two","two times length plus breadth"]
    },
    "Trapezoid":
    {
        Area :["the area of a trapezoid is half of the sum of its bases multiplied by its vertical height","the area of a trapezoid if half the height times its sum of bases"],
        Perimeter :["I'm sorry but all i can say is the sum of its sides"]
    },
    "Ellipse":
    {
        Area:["the area of an ellipse is pi times the product of lengths of its semi major and semi minor axes"],
        Perimeter:["Sorry bud , I don't know it as of now"]
    },
    "Cylinder":
    {
        Volume:["pi times the product of square of radius and its height","pi r squared h . where r is the radius of the cylinder and h is the height of the cylinder"],
        Area:["The curved surface area is the cylinder is two pi times the product of radius and height and the total surface area can be obtained by adding two pi times the square of radius to this","the curved surface area of cylinder is two pi r h where r is the radius of the cylinder and h is its height. Also the total surface area will be two pi r times r plus h"]
    },
    "Sphere":
    {
        Volume:["The volume of a sphere is four thirds pi times the cube of radius of the sphere"],
        Area:["The surface area of the sphere is four pi times the square of radius of the sphere"]
    },
    "Cuboid":
    {
        Volume:["The volume of a box is the product of all its length , breadth and height"],
        Area:["The surface area of a box is two times l b plus b h plus l h , where l is the length , b is the breadth , and h is the height of the box"]
    },
    "Cone":
    {
        Volume:["The volume of a cone is pi by 3 times r squared h where r is its radius and h is its height"],
        Area:["The curved Surface area of a cone is pi r l where l is given by square root of h squared plus r squared"]
    }
};



function ComputeBalancedString(reactants,products)
{   
    var output="Here it comes. ";
    try
    {

        var rstring="";
        var pstring="";

        //Computing Product and Reactant Strings
        {
            for( var i=0;i<reactants.length;i++)
            {
                // rstring=rstring+reactants[i];
                var a=chemicalFormula(reactants[i]);
                var b=Object.keys(a);
                for(var j=0;j<b.length;j++)
                {
                    rstring=rstring+b[j].toString()+a[b[j]].toString();
                }
                if(i!=reactants.length-1)
                    rstring=rstring+" +";
            }
            for(i=0;i<products.length;i++)
            {
                // pstring=pstring+products[i];
                a=chemicalFormula(products[i]);
                b=Object.keys(a);
                
                for(j=0;j<b.length;j++)
                {
                    pstring=pstring+b[j].toString()+a[b[j]].toString();
                }

                if(i!=products.length-1)
                    pstring=pstring+" +";
            }
        }

        //Checking both LHS and RHS for number of elements

        {
            b=[];
            for(i=0;i<reactants.length;i++)
            {
                var l=chemicalFormula(reactants[i]);
                a=Object.keys(l);
                for(var j=0;j<a.length;j++)
                {
                    for(var k=0;k<b.length;k++)
                    {
                        if(b[k]==a[j])
                            break;
                    }
                    if(k==b.length)
                        b.push(a[j]);
                }
            }

            var c=[];

            for(i=0;i<products.length;i++)
            {
                l=chemicalFormula(products[i]);
                a=Object.keys(l);
                for(j=0;j<a.length;j++)
                {
                    for(k=0;k<c.length;k++)
                    {
                        if(c[k]==a[j])
                            break;
                    }
                    if(k==c.length)
                        c.push(a[j]);
                }
            }
            
            if(c.length!=b.length)
            {
                InputError();
            }
            else
            {
                for(i=0;i<b.length;i++)
                {
                    for(j=0;j<c.length;j++)
                    {
                        if(c[j]==b[i])
                            break;
                    }
                    if(j==c.length)
                        break;
                }
                if(i!=b.length)
                    InputError();

                for(i=0;i<c.length;i++)
                {
                    for(j=0;j<b.length;j++)
                    {
                        if(b[j]==c[i])
                            break;
                    }
                    if(j==b.length)
                        break;
                }
                if(i!=c.length)
                    InputError();
            }
    
            console.log(b);
        }
        var e=new chemicalEquation.ChemicalEquation(rstring,pstring);
        var f=e.balance();

        

        // Computing Output String
        {
            for(i=0;i<reactants.length;i++)
            {
                output=output+f.quantities[i].quantity.toString() + variableSpellOut(reactants[i]);
                if(i!=reactants.length-1)
                {
                    output=output+' + ';
                }
                else
                {
                    output=output+" gives ";
                }
            }
            for(j=0;j<products.length;j++)
            {
                output=output+f.quantities[i+j].quantity.toString() + variableSpellOut(products[j]);
                if(j!=products.length-1)
                {
                    output=output+' + ';
                }

            }
        }
    }
    catch(e){
        output = " Sorry ! There is some problem with the equation";

    }
    finally{
    return output;
    }
}


function DoubleAngle(func,a,cond){
    switch (func){
        case "sin":
            var res = "Two sine " + a + " cos " + a ;
            res = ReplaceString(res,'cos',SayAs('cos','cause'));
            return res;

        case "cos":
            switch(cond){
                case "cos":
                    var res = "Two cos squared " + a + " minus one";
                    res = ReplaceString(res,'cos',SayAs('cos','cause'));
                    return res;
                
                case "sin":
                    var res = "One minus two sine squared "+ a   ;
                    return res;

                

                default:
                    return " cos squared " + a + " minus sine squared " + a;
            }

        case "tan":
                var res = "Two tan "+ a + " the whole divided by one minus two tan squared  " + a ;
                return res;

        default:
                return " Sorry I don't know such an expansion yet.";

    }

}

function trigAdd(func,a,b,op){

    switch (func){
        case "sin":
            //op should be plus or minus
            var res = "sine " + a + " cos " + b + ' '+ op + " cos " + a + " sine " + b ;
            res = ReplaceString(res,'cos',SayAs('cos','cause'));
            console.log(SayAs('cos','cause'));
            console.log(res);
            return  res;
        

        case "cos":

            op = (op!="plus")?"plus":"minus";
            var res = "cos " + a + " cos " + b + ' '+ op + " sine " + a + " sine " + b ;
            res = ReplaceString(res,'cos',SayAs('cos','cause'));
            return res;
        

        case "tan":
            var inv_op = (op!="plus")?"plus":"minus";
            var res = "tan " + a + ' ' + op +  " tan " + b + " the whole divided by one  " + inv_op + " tan " + a + " tan " + b ;
            return res;
    


        case "cot":
            inv_op = (op!="plus")?"plus":"minus";
            var res = " cot " + a + " cot " + b + ' ' + inv_op + " one the whole divided by  " + "cot " + b + ' ' + op +  " cot " + a    ;
            return res;
        


        default:
            return "bad input" ;
            
    }


}

//(a+(op)b)^n
function ComputeBinomial(n,a,b,op)
{
    var output="";
    if(n<1)
    {
        InputError();
    }
    for(var r=0;r<=n;r++)
    {
        if(r!=0)
        {
            if(op==-1)
            {
                if((n-r)%2==0)
                    output=output+" + ";
                else
                    output=output+" minus ";
            }
            else
            {
                output=output+" + ";
            }
        }
        if(nCr(n,r)!=1)
        {
            output=output+(nCr(n,r)).toString();
        }

        if((n-r)!=0)
        {
            output=output+" "+a;
            if((n-r)==2)
            {
                output=output+" squared ";
            }
            else if((n-r)==3)
            {
                output=output+" cubed ";
            }
            else if((n-r)!=1)
            {
                output=output+" raised to "+(n-r).toString()+" ";
            }
        }
        if(r!=0)
        {
            output=output+" "+b;
            if(r==2)
            {
                output=output+" squared ";
            }
            else if(r==3)
            {
                output=output+" cubed ";
            }
            else if(r!=1)
            {
                output=output+" raised to "+r.toString()+" ";
            }
        }
    }
    return output;
}

//a^n-b^n
function PowerSubtract(n,a,b)
{
    if(n<2)
    {
        InputError();
    }
    var output=a.toString()+" minus "+b.toString()+" times ";
    n--;
    for(var r=0;r<=n;r++)
    {
        if(r!=0)
        {
            output=output+" + ";
        }

        if((n-r)!=0)
        {
            output=output+" "+a;
            if((n-r)==2)
            {
                output=output+" squared ";
            }
            else if((n-r)==3)
            {
                output=output+" cubed ";
            }
            else if((n-r)!=1)
            {
                output=output+" raised to "+(n-r).toString()+" ";
            }
        }
        if(r!=0)
        {
            output=output+" "+b;
            if(r==2)
            {
                output=output+" squared ";
            }
            else if(r==3)
            {
                output=output+" cubed ";
            }
            else if(r!=1)
            {
                output=output+" raised to "+r.toString()+" ";
            }
        }
    }
    return output;

}


function InputError()
{
    console.error("ERROR IN INPUT");
    //process.exit();
}

function nCr(n,r)
{
    var f=factorial(n)/(factorial(r)*factorial(n-r));
    console.log(f.toString());
    return f;
}

function factorial(r)
{
    var f=1;
    for(var i=1;i<=r;i++)
        f=f*i;

    return f;
}

function logarithm(a,b,op)
{
   switch (op)
    {
        case "mul":
            //op should be plus or minus
            var res = "log " + a + " plus log " + b ;
            return  res;
        

        case "div":

            var res = "log " + a + " minus log " + b ;
            return  res;
    

        case "power":
            var res = a + " log " + b ;
            return  res;

        default:
            return "bad input" ;
    }
}


//check slots
function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}


function isSlotResolutionSuccess(request,slotName){
    var status = request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].status.code ; 
    if( status == "ER_SUCCESS_MATCH"){
        return true;
    }
    else{
        return false;
    }
}

function variableSpellOut(st){
    st = st.replace('.','');
    return '<say-as interpret-as="spell-out">' + st +  '</say-as>' ;
}

function SayAs(st,alias){
    return '<sub alias="'+ alias + '"' + '>' + st + '</sub>';
}

function ReplaceString(parent,find,replace)
{
    var i=0;
    var replacer="";
    for(i=0;i<parent.length;i++)
    {
        var j=0;
        for(j=0;(j<find.length)&&(i<=(parent.length-find.length));j++)
        {
            if(parent[j+i]!=find[j])
                break;
        }
        if(j==find.length)
        {
            var k=0;
            // for(k=0;k<i;k++)
            // {
            //     replacer=replacer+parent[k];
            // }
            for(k=0;k<replace.length;k++)
            {
                replacer=replacer+replace[k];
            }
            i=i+find.length-1;
        }
        else
        {
            replacer=replacer+parent[i];
        }
    }
    return replacer;
}

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

function apology()
{
    return sorryMsg[Math.floor(Math.random()*sorryMsg.length)];
}

const handlers = 
{
    'LaunchRequest': function () 
    {
        
        this.response.speak("Welcome to " + SKILL_NAME + ". I can help you with math formulas, balancing chemical equations Et cetera.").listen('ask help if you want help');
        this.attributes.lastSpeech = HELP_MESSAGE ;
        this.emit(':responseReady');
        //this.emit('GetNewFactIntent');
    },
    'trigAddIntent': function() {
        try
        {
            var func = this.event.request.intent.slots.trigFunc.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            var a = this.event.request.intent.slots.vblA.value;
            var b =this.event.request.intent.slots.vblB.value;
            var op = this.event.request.intent.slots.operator.value;
            var st ;

            a = variableSpellOut(a);
            b = variableSpellOut(b);

            st = trigAdd(func,a,b,op) ; 
            this.attributes.lastSpeech = st ; 
            this.response.speak(st + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology()).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },
    'doubleangleIntent':function(){
        try
        {
            var func = this.event.request.intent.slots.trigFunc.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            var a = this.event.request.intent.slots.variable.value;
            var cond = 0;
            if(isSlotValid(this.event.request,'trigCond')){
            cond = this.event.request.intent.slots.trigCond.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            }
            a = variableSpellOut(a);
            var st = DoubleAngle(func,a,cond);

            this.attributes.lastSpeech = st ; 
            this.response.speak(st + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology()).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },

    'areaIntent': function(){
        try
        {
            var shape = this.event.request.intent.slots.polyShape.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            var op = this.event.request.intent.slots.polyOp.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            var st;

            if(shapeData[shape][op]){
                st = shapeData[shape][op][Math.floor(Math.random()*shapeData[shape][op].length )] ;
                this.response.speak(st + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
                this.attributes.lastSpeech = st ; 
            }
            else{
                this.response.speak("Sorry. Don't know that yet." + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
                this.attributes.lastSpeech = HELP_MESSAGE ;

            }
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology()).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },

    'logarithmIntent': function()
    {
        try
        {
            var a = this.event.request.intent.slots.vblA.value;
            var b =this.event.request.intent.slots.vblB.value;
            var op = this.event.request.intent.slots.logOp.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            
            a = variableSpellOut(a);
            b = variableSpellOut(b);

            this.response.speak(logarithm(a,b,op) + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology()).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },

   
    'chemIntent': function() {
        try
        {
            var unIdentified = false;
            var reactants = [] ;
            var products = [];
            var st;
            var ch = ['a','b','c','d'] ;
            for (var x in ch){
                console.log('log:'+ch[x]+'Comp');
                console.log(isSlotValid(this.event.request,ch[x]+'Comp'));


                if(isSlotValid(this.event.request,ch[x]+'Comp')){
                    console.log(x);
                    if(isSlotResolutionSuccess(this.event.request,ch[x]+'Comp')){
                        reactants.push(this.event.request.intent.slots[ch[x]+'Comp'].resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    }
                    else{
                        unIdentified = true ;
                    }
                }
            }

            var pr = ['p','q','r','s'];
            for (var x in pr){
                console.log('log:'+pr[x]+'Comp');
                console.log(isSlotValid(this.event.request,pr[x]+'Comp'));


                if(isSlotValid(this.event.request,pr[x]+'Comp')){
                    console.log(x);
                    if(isSlotResolutionSuccess(this.event.request,pr[x]+'Comp')){
                        products.push(this.event.request.intent.slots[pr[x]+'Comp'].resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    }
                    else{
                        unIdentified = true ; 
                    }
                }
            }
            console.log("reactants"+reactants);
            console.log("products"+products);
            if(!unIdentified){
            st = ComputeBalancedString(reactants,products);
            }
            else{
                st = apology() + ' you can try saying like .' + CHEM_EG[Math.floor(Math.random()*CHEM_EG.length)];
            }
            this.attributes.lastSpeech = st;
            this.response.speak(st + "Balanced it! remember me when you need a piece of pi !");
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology()).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },
  
   // Test my {language} knowledge
    'algebraIntent': function() {
        try{
            console.log("log:" + isSlotValid(this.event.request,'exponentA'));
            if (!(isSlotValid(this.event.request,'exponentA')||(isSlotValid(this.event.request, 'exponentB')))){
                console.log("log: ivdethi");
                var a = this.event.request.intent.slots.vblA.value;
                var b =this.event.request.intent.slots.vblB.value;
                var op = this.event.request.intent.slots.op.resolutions.resolutionsPerAuthority[0].values[0].value.name=="minus"?-1:1;
                var x = this.event.request.intent.slots.exponent.resolutions.resolutionsPerAuthority[0].values[0].value.name;

                a = variableSpellOut(a);
                b = variableSpellOut(b);
                
                var st = ComputeBinomial(x,a,b,op)
                this.attributes.lastSpeech = st;

                this.response.speak(st + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
            }
            else{
                var n1 = this.event.request.intent.slots.exponentA.resolutions.resolutionsPerAuthority[0].values[0].value.name;
                var n2 = this.event.request.intent.slots.exponentB.resolutions.resolutionsPerAuthority[0].values[0].value.name;
                var a = this.event.request.intent.slots.vblA.value ;
                var b =  this.event.request.intent.slots.vblB.value ;

                a = variableSpellOut(a);
                b = variableSpellOut(b);
                

                var st;
                if(n1==n2){
                    st = PowerSubtract(n1,a,b);
                    this.response.speak(st + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?");
                    this.attributes.lastSpeech = st;            
                }
                else{
                    this.response.speak("Sorry. No found expansion for that formula"  + QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)] ).listen("Would you like a piece of pi ?") ;   
                    this.attributes.lastSpeech = HELP_MESSAGE;
                }

                
            }
            this.emit(':responseReady');
        }
        catch(e)
        {
            this.response.speak(apology() ).listen("Would you like a piece of pi ?");
            this.emit(':responseReady');
        }
    },

    // 'GetNewFactIntent': function () {
    //     const factArr = data;
    //     const factIndex = Math.floor(Math.random() * factArr.length);
    //     const randomFact = factArr[factIndex];
    //     const speechOutput = GET_FACT_MESSAGE + randomFact;
    //     var st = ComputeBalancedString(reactants,products);
    //     this.response.speak('For the first time!' + st);

    //     this.response.cardRenderer(SKILL_NAME, randomFact);
    //     this.response.speak( st);
    //     this.emit(':responseReady');
    // },
    // 'AMAZON.HelpIntent': function () {
    //     const speechOutput = HELP_MESSAGE;
    //     const reprompt = HELP_REPROMPT;

    //     this.response.speak(speechOutput).listen(reprompt);
    //     this.emit(':responseReady');
   // },
   'AMAZON.HelpIntent': function () {

        this.response.speak(HELP_MESSAGE + ' for example you can say like .' + COMB_EG[Math.floor(Math.random()*CHEM_EG.length)]).listen("Would you like a piece of pi ?"); 
        this.emit(':responseReady'); 
    },

    'SessionEndedRequest': function () {

        this.response.speak('Have a nice day! Call  me when you need a piece of pi!  '); 
        this.emit(':responseReady'); 
    },

    

   'AMAZON.RepeatIntent': function () { 
        this.response.speak(this.attributes.lastSpeech +   QUERY_MSG[Math.floor(Math.random()*QUERY_MSG.length)]).listen("Would you like a piece of pi ?"); 
        this.emit(':responseReady'); 
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Have a nice day! Remember  me when you need a piece of pi!  ');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Have a nice day! Call  me when you need a piece of pi!  ');
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    //alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
