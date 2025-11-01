"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as solidStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons"
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"

const StarRating = ({rating = 0, max= 5}) => {
    const stars = []

    for(let i = 1; i <= max; i++) {
        if (rating >= i) {
            stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{color: '#0564f1'}} className="text-500"/>)
        }
        else if (rating >= i - 0.5) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-500" />)
        }
        else {
            stars.push(<FontAwesomeIcon key={i} icon={regularStar} className="text-500" />)
        }
    }

    return <div className="flex gap-1">{stars}</div>
}

export default StarRating