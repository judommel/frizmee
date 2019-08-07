import React from "react"
import axios from "axios"

class FrizTip extends React.Component {

state = {
    isLoading:true,
    liste : []
}

async componentDidMount() {

let response = await axios.get("/friztips")

this.setState( { liste : response.data, isLoading : false } )

}

onChangeTip = (id, tip) => {

let newTip = prompt("Tu peux amender le tip !", tip)

axios.post("/friztips/update", {
id: id,
tip: newTip
})

}

renderTipList = () => {

let tipList = this.state.liste.map( (tip, index) =>
    <tr key={index}>
<td>{tip.title}</td>
<td>{tip.tip}<i className="fas fa-edit" onClick={this.onChangeTip(tip._id, tip.id)}></i></td>
<td>{tip.author}</td>
    </tr>
    )

return tipList

}

render() {

    if(this.state.isLoading) {
        return <div>Wait for it...</div>
    } else { 
        return <><table>
        <thead>
<tr>
    <th>Produit</th>
    <th>Conseils</th>
    <th>De</th>
</tr>
{this.renderTipList}
        </thead>
        </table></>
    }

    

}


}

export default FrizTip