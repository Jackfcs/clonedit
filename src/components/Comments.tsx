import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {useParams} from "react-router-dom";

interface Props {
}



const Comments: React.FC<Props> = () => {

  const id = useParams()
  console.log(id)

    return (
        
        <div>
        Look at the comments!{id.id}

      </div>
      
    )
}


export default Comments