import React from "react";
import "../../styles/home.css";
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {

	return (
		<div className="text-center mt-5">

			<Carousel>
				<Carousel.Item>
					<img
						src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/12/star-wars-scaled.jpg?fit=2560%2C1440&quality=50&strip=all&ssl=1"
						className="d-block mx-auto carousel-image"
						alt="First slide"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<img
						src="https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg"
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
