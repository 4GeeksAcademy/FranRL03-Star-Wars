import React from "react";
import "../../styles/home.css";
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {

	return (
		<div className="text-center mt-4 mb-4">

			<Carousel>
				<Carousel.Item>
					<img
						src="https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg"
						className="d-block mx-auto carousel-image"
						alt="First slide"
						/>
				</Carousel.Item>
				<Carousel.Item>
					<img
						src="https://lumiere-a.akamaihd.net/v1/images/star_wars_2013c877.jpeg?region=0,0,1920,1080"
						className="d-block mx-auto carousel-image"
						alt="Second slide"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<img
						src="https://wallpapers.com/images/hd/star-wars-pictures-wa4rlzlveqwej66l.jpg"
						className="d-block mx-auto carousel-image"
						alt="Third slide"
					/>
				</Carousel.Item>
			</Carousel>

		</div>
	);
};
