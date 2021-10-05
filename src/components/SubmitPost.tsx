import React, {useState, useRef} from "react";
import "../styles/SubmitPost.scss";
import InfoPanels from "./InfoPanels";
import { ImageOutline } from "react-ionicons";
import { LinkOutline } from "react-ionicons";
import { NewspaperOutline } from "react-ionicons";

const SubmitPost: React.FC = () => {

    const [selected, setSelected] = useState('1')


    const test = (e: React.MouseEvent) => {
        setSelected(e.currentTarget.id)
    }

    

  return (
    <div className="bg-padding">
      <div className="create-post-page">
        <div className="submit-post-section">
          <h3 className="create-post-title">Create a post</h3>
          <div  className="post-creation-container">
            <div className="post-types">
              <div id="1" onClick={test}  className={`text-post post-type ${selected === '1' ? 'highlighted' : ''}`}>
                <NewspaperOutline
                  color={selected === '1' ? '#0079D3' :'#8f8f8f'}
                  height="25px"
                  width="25px"
                  cssClasses="post-text-icon post-icon"
                />
                <span>Post</span>
              </div>
              <div id="2" onClick={test} className={`media-post post-type ${selected === '2' ? 'highlighted' : ''}`}>
                <ImageOutline
                color={selected === '2' ? '#0079D3' :'#8f8f8f'}
                  height="25px"
                  width="25px"
                  cssClasses="post-image-icon post-icon"
                />
                <span>Images</span>
              </div>
              <div id="3" onClick={test}  className={`link-post post-type ${selected === '3' ? 'highlighted' : ''}`}>
                <LinkOutline
                color={selected === '3' ? '#0079D3' :'#8f8f8f'}
                  height="25px"
                  width="25px"
                  cssClasses="post-link-icon post-icon"
                />
                <span>Link</span>
              </div>
            </div>
            <div className="post-content">
              <form className="post-form">
                <input
                  placeholder="Title"
                  className="post-input"
                  type="text"
                ></input>
                <textarea
                  placeholder="Text (optional)"
                  className="post-input large-input"
                ></textarea>
                <input
                  className="submit-post"
                  type="submit"
                  value="POST"
                ></input>
              </form>
            </div>
          </div>
        </div>
        <div className="create-post-info-panels">
          <InfoPanels />
        </div>
      </div>
    </div>
  );
};

export default SubmitPost;
