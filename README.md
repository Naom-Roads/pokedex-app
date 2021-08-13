# pokedex-app

# Welcome to the Pokedex

Displays list of Pokemon with the following:

1. Name
2. Description
3. Type
4. Height


Notes: 

---- DOM ----

* Becareful with innerHTML due to security issues 
  use innerText and append instead
* .setAttribute( oldatt, newAtt)
* .removeAttribute("id")
* .getAttribute is generally available as a method, but it is explicit 
   and helps when you cant get the attribute as a method

* Toggle adds if doesn't exists and removes it if does exist .toggle

* Style Property = spanHi.style.backgroundColor 

## Event Listeners 

* Basic Construct = classname.domMethod( 'event', callbackfunction that runs everytime event happens {
    action i.e console.log(e) 
* When we click an element it will work its ways from the closest element to the furthest called bubbling
* Capturing starts with what is furthest away to the closest and then bubbles 

### Example

} )

grandparent.addEventListener('click', e => {   
    console.log('Grandparent 1)  // Prints Grandparent when clicked 

})

grandparent.addEventListener('click', e => {
    console.log('Grandparent 1) // You can have multiple Event Listeners 
})

 parent.addEventListener('click', e => {    
    console.log('Parent 1) // Prints our Parent and Grandparent 

})

 child.addEventListener('click', e => {
    console.log('child 1') // Prints out Child, Parent, and Grandparent 
})

* To capture you can pass an option to capture 
    grandparent.addEventListener('click', e => {   
    console.log('Grandparent 1)  
    },
    - { capture: true }
    e.stopPropagation() // Stops from propagating upwards or downwards
)

* To stop all propagation we can take event object 'e' and use stop 'e.stopPropagation'

# Limit on eventListener Property

* You can use once: true, if you just want it to run once, you can also use .remove function to set a limit on when the listener runs 

parent.addEventListener('click', printHi)

setTimeout(() => {
    parent.removeEventListener('click', printHi)}, 
    2000)}, // this will wait 2000 seconds and then remove it, this is a new event so you have to create a new variable or function for both the add and remove event listener. 

function printHi() {
    console.log('Hi')
}

## Event Delegation 

- Method 1 

const divs = document.querySelectorAll('div)

divs.forEach(div => {
    div.addEventListener("click", () => {
    console.log('hi')
 })
}) 

const newDiv = document.createElement('div') 
newDiv.style.width = '200px'
newDiv.style.backgroundColor = 'purple'
document.body.append(newDiv) // This won't print Hi because the selector ran before the new div was created. You could call the event listener and then add console log, but this is reptitive and clunky

- Method 2 using Matches 


const divs = document.querySelectorAll('div)

document.addEventListener('click', e => {
    if (e.target.matches("div")) {
    console.log('hi')
    }
})

const newDiv = document.createElement('div') 
newDiv.style.width = '200px'
newDiv.style.backgroundColor = 'purple'
document.body.append(newDiv)

* function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

You can then do 


document.addEventListener('click', 'div', e => {
    console.log('hi')
    }
})


## Data Attributes

 * Data set will have all custom attributes, it will take data 
   convert it and just show the value.
 
