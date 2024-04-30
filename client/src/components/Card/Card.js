import * as React from 'react';
import { Link } from 'react-router-dom';

import { Rating,CardActionArea,Typography,CardContent,Card } from '@mui/material';
import { LazyLoadImage } from "react-lazy-load-image-component";

import {BiTimer} from 'react-icons/bi'
import {FaFireAlt} from 'react-icons/fa'

import './CardStyles.css'

export default function ActionAreaCard({card}) {
  return (
    <Link className='recipecard' to={`/recipe/${card._id}`}>
      <Card className="card">
        <CardActionArea>
          <LazyLoadImage className='card-media'
            // component="LazyLoadImage"
            height="200"
            src={card.Images[0]}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="h6" component="div" align="left">
              {card.Name}
            </Typography>
            <div className="second-line">
              <Rating name="half-rating" value={card.AggregatedRating} precision={0.5} readOnly />&nbsp;&nbsp;
              <span className='rating-count'>{card.CommentsCount} ratings</span>
            </div>
            <div className='third-line'>
              <div className='timer-class'>
                <BiTimer className='timer-icon'/>
                {card.TotalTime}&nbsp;min
              </div>
              <div className='calories-class'>
                <FaFireAlt className='calories-icon'/>
                {card.Calories} calories
              </div>
              <div className='tooltip-div'>
                <span style={{ paddingLeft: "20px" }}></span>
                <span className="carbs tooltip">
                  <span className="tooltiptext carbs-tooltiptext">{card.CarbohydrateContent}g Net Carbs</span>
                </span> 
                {card.CarbohydrateContent}g&nbsp;&nbsp;
                <span style={{ padding: "3px" }}></span>
                <span className="proteins tooltip">
                  <span className="tooltiptext proteins-tooltiptext">{card.ProteinContent}g Proteins</span>
                </span>
                {card.ProteinContent}g&nbsp;&nbsp;
                <span style={{ padding: "3px" }}></span>
                <span className="fats tooltip">
                  <span className="tooltiptext fats-tooltiptext">{card.FatContent}g Fats</span>
                </span>
                {card.FatContent}g
                &nbsp;
                &nbsp;
                &nbsp;
              </div>
            </div>

          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

