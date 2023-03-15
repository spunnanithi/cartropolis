import React from "react";

function MainPage() {
	return (
		<div className="container">
			<div className="row justify-content-center mt-5">
				<div className="col-md-3">{/* left column */}</div>
				<div className="col-md-6">
					{/* middle column */}
					<div className="card border-secondary">
						<div className="card-body">
							<h1 className="card-title text-center mb-3">Cartropolis</h1>
							<p className="card-text text-center">
								The premiere solution for automobile dealership management!
							</p>
							<div
								id="myCarousel"
								className="carousel slide mt-3"
								data-bs-ride="carousel">
								<div className="carousel-indicators">
									<button
										type="button"
										data-bs-target="#myCarousel"
										data-bs-slide-to="0"
										className="active"
										aria-current="true"
										aria-label="Slide 1"></button>
									<button
										type="button"
										data-bs-target="#myCarousel"
										data-bs-slide-to="1"
										aria-label="Slide 2"></button>
									<button
										type="button"
										data-bs-target="#myCarousel"
										data-bs-slide-to="2"
										aria-label="Slide 3"></button>
									<button
										type="button"
										data-bs-target="#myCarousel"
										data-bs-slide-to="3"
										aria-label="Slide 4"></button>
								</div>
								<div className="carousel-inner">
									<div className="carousel-item active">
										<div
											className="card"
											style={{ width: "calc(100% + 1rem)", height: "400px" }}>
											<img
												src="https://hips.hearstapps.com/hmg-prod/images/mclaren-senna-globaltestdrive-0093-jpg-1534612835.jpg?crop=0.893xw:0.733xh;0.0933xw,0.101xh&resize=1200:*"
												className="card-img-top h-100 object-fit-cover w-100"
												alt="Car"
											/>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="card"
											style={{ width: "calc(100% + 1rem)", height: "400px" }}>
											<img
												src="https://www.motortrend.com/uploads/f/71623460.jpg"
												className="card-img-top h-100 object-fit-cover w-100"
												alt="Car"
											/>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="card"
											style={{ width: "calc(100% + 1rem)", height: "400px" }}>
											<img
												src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/Mercedes-Benz-CLS-Class/6684/1541421574163/front-left-side-47.jpg"
												className="card-img-top h-100 object-fit-cover w-100"
												alt="Car"
											/>
										</div>
									</div>
									<div className="carousel-item">
										<div
											className="card"
											style={{ width: "calc(100% + 1rem)", height: "400px" }}>
											<img
												src="https://i.pinimg.com/originals/65/7b/8a/657b8a34f91de10c99bab75d1e9c4631.jpg"
												className="card-img-top h-100 object-fit-cover w-100"
												alt="Car"
											/>
										</div>
									</div>
								</div>
								<button
									className="carousel-control-prev"
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide="prev">
									<span
										className="carousel-control-prev-icon"
										aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button
									className="carousel-control-next"
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide="next">
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3">{/* right column */}</div>
			</div>
		</div>
	);
}

export default MainPage;
