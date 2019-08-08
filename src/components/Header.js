import React from "react"

function Header (props) {

return ( <header>
<div>
  <h1>Frizmee !!!</h1>
  {props.tasks && (
    <h3>
      (On a {props.tasks.length} produits différents dans le
      congel !)
    </h3>
  )}
</div>
</header> )


}

export default Header