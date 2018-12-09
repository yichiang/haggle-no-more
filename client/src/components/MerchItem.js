import React, { Component } from 'react';
import './../styles/App.css';
import DiscoverLogo from './../images/DiscoverLogo.svg';
import ReactSVG from 'react-svg'
import './../styles/Merchants.css'
import { Icon, Rating} from 'semantic-ui-react'

class MerchItem extends Component {
  render() {
    const {idIter, m, locStyle} = this.props;
    return (
      <div key={idIter} style={locStyle} className="locItem">
          <div className="merchants_row_item">
                  <div>


                  <h3 className='text_title'>{m.name}
                    <a className='text_title_link' href={m.website}><Icon name='linkify'/></a>
                  </h3>

                  </div>
                  <div>
                  {m.card_network === "DCI" && <ReactSVG src={DiscoverLogo}/>}

                  </div>
                </div>
                <div className="merchants_row_item">
                  <div>
                  <p className='text_address'>{m.address1}</p>
                  <p className='text_address'>{m.phone}
                  </p>
                  {m.rating > 0 && <Rating icon='star' defaultRating={m.rating} maxRating={5} />}
                  {m.rating > 0 && <span>{m.rating}</span>}

                  </div>
                  <div>
                  </div>
                </div>
            </div>
    );
  }
}
// {m.imageBinary &&  <img src={"data:image/png;" + m.imageBinary} />}

export default MerchItem;
