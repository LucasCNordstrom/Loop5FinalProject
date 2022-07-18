import './ItemList.css';
import { RiDeleteBin5Fill } from 'react-icons/ri';

function ItemList() {
  
  return (
    <div className='ItemList'>
      Items in the fridge:
      <ul className='ItemList--list'>
        <li> 
          <div> item.name </div>
          <div> item.expiration </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </li>
        <li> 
          <div> item.name </div>
          <div> item.expiration </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </li>
        <li> 
          <div> item.name </div>
          <div> item.expiration </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </li>
      </ul>
    </div>
  )
}

export default ItemList;
