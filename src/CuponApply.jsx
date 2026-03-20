import React from "react"
 
function CuponApply(){
    const [input,setInput]=useState("");
    
    return (
        <>
        <input type="text"
               placeholder="Enter coupon"
               value={input}
               onChange={(e) => setInput(e.target.value)}
        />
        
        </>
    )
}

export default CuponApply