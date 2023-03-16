// Import libraries

import React, { Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import data from './dummy_records.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCalendarAlt, faUser,faTimes } from '@fortawesome/free-solid-svg-icons'
import dragDots from './drag-dots.svg';
import Modal from './Modal';
import "./modal_css.css";

function Home() {
  const [varData, setData] = useState(data);
  const [checkedData, setCheckedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Modal
  const handleClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  // listcheck
  const handleCheckbox = (id) => {
    const isChecked = checkedData.includes(id);

    if (isChecked) {
        setCheckedData(checkedData.filter((checkedId) => checkedId !== id));
    } else {
        setCheckedData([...checkedData, id]);
    }

    setData((prevData) => {
      return prevData.map((json_data) => {
        if (json_data.id === id) {
          return {
            ...json_data,
            isChecked: !isChecked,
          };
        }
        return json_data;
      });
    });
  }

  const handleDeleteChecked = () => {
    setData((prevData) => {
      return prevData.filter((json_data) => !checkedData.includes(json_data.id));
    });
    setCheckedData([]);
  }

  return (
<Fragment>
    <Modal isOpen={isOpen} onClose={handleClose}>
    {selectedItem && (
        <div>
                <div className='mheader'>
                    <h2>{selectedItem.title}</h2>
                    <button id='closeButton' className='close-button' onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'gray' }} />
                    </button>
                </div>
                <div className='mbody'>
                    <p>{selectedItem.author} | {selectedItem.date}</p>
                </div>

                <div className='mcontent'>
                    <p>{selectedItem.content}</p>
                </div>

                <div className='mfooter'>
                    <button id='mPublishButton' className='publish-button'>Publish</button>
                    <button id='mDeleteButton' className='delete-button'>Delete</button>
                </div>
        </div>
    )}

    </Modal>
        <div style={{ margin: "5em" }}>
            <h1 className='category'>News Articles</h1>
            <div className='category2'>
                <div className='button_container'>
                    <input className="outside_checkBox" type="checkbox" />
                    <Button id='publishButton'>Publish</Button>
                    <Button id='deleteButton' onClick={handleDeleteChecked}>Delete</Button>
                <div>
            </div>
        </div>
        
        <div className='searchContainer'>
            <input className='searchBox' id='searchBox' type="text" placeholder="Search ..."/>
        </div>
        </div>
                <ul style={{ listStyleType: "none" }}>
                    {
                        varData && varData.length > 0
                        ?
                        varData.map((item) => {
                                return (
                                    <div className='container'>
                                        <li key={item.id}> 
                                        <div className='wrapper'>
                                            <div className='sub_container'>
                                                <div className='check_box'>
                                                    <img src={dragDots} alt="Drag dots" className='dragDots' />
                                                    <input type="checkbox" checked={item.isChecked} onChange={() => handleCheckbox(item.id)} />    
                                                </div>
                                                <div className='layer1' style={{textAlign:'left'}}>

                                                    <div className='title'>
                                                        {item.title}
                                                    </div>
                                                    
                                                    <div className='subheading'> 
                                                        <FontAwesomeIcon icon={faUser} style={{ color: 'green', marginRight: '.5em' }} />
                                                        {item.author}

                                                        <div className='date'>
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: 'green',marginRight:'.5em'}} />
                                                            {item.date}
                                                        </div>
                                                        
                                                    </div>
                                                    <div className='introduction'>
                                                        {item.content.split(" ").slice(0, 10).join(" ")}
                                                        {item.content.split(" ").length > 10 ? "..." : ""}
                                                        {item.content.split(" ").length > 10 ? (
                                                        <a onClick={() => handleClick(item)}>
                                                            <FontAwesomeIcon icon={faEye} />Read full
                                                        </a>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className='genre'>
                                                    <div className='sports'>#Sports</div>
                                                    <div className='sports'>#Worldwide</div>
                                                    <div className='sports'>#Local</div>
                                                </div>
                                            </div>
                                        </div>
                                        </li>
                                    </div>
                                )
                            })
                            :
                            <div>No data available</div>
                    }
                </ul>
            </div>
        </Fragment>
    )
}

export default Home;