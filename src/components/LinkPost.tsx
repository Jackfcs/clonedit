import React from 'react';
import { BiLinkExternal } from "react-icons/bi";

interface Props {
   postTitle: string;
   src: string;
  }

const LinkPost:React.FC<Props> = ({postTitle, src}) => {

    const getLinkUrl = (url: string) => {
        if (url.startsWith("https://") || url.startsWith("http://")) {
          return url
        } else {
          return "https://" + url
        }
      }
    
      const getLinkDisplay = (url: string) => {
        let formatted = url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        
    
        return formatted.substring(0, 30)
    
      }

    return (
        <div>
            
            <h3 className="post-title">{postTitle}</h3>

            <a className="link-post-url"href={getLinkUrl(src)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
           
              <p className="link-post-url">{getLinkDisplay(src)}...<BiLinkExternal /></p>
            </a>
            
          
        </div>
    )
}

export default LinkPost
