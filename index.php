<!DOCTYPE html>
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<link href="https://cdn.worldvectorlogo.com/logos/takeaway.svg" rel="shortcut icon" type="image/x-icon">
<title>Take Away and Near Away </title>

<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link rel="stylesheet" href="css/fontawesome-free-5.15.1-web/css/all.css">
</head>

<body>
	<section class="order-food-online">
		<div class="container" id="main-container">
			<div class="row" id="search">
				<div class="col-md-12">
					<div id="page-heading">
						<h2> Find restaurants near you </h2> </div>
					<div class="all-items">
						<div class="container">
							<div class="row">
								<div class="col-sm">
									<div class="search">
										<form id="search-form">
											<input class="search-restaurant" name="search" id="search-input" value="" type="search" placeholder="Search..">
											<div class="icon-btn">
												<div class="cross-icon"> <i class="fa fa-cutlery"></i> </div>
												<div class="s-m-btn">
													<button type="button" id="show-favourite-btn" class="show-fav-btn">Show Favourites</button>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div class="col-sm">
									<div class="form-group">
										<div class="row">
											<div class="col" id="sort-by-label"> Sort by: </div>
											<div class="col">
												<select name="restaurant_sorting_by" id="restaurant_sorting_by" class="form-control">
													<option value="bestMatch">Best Match</option>
													<option value="newest">Newest</option>
													<option value="ratingAverage">Rating average</option>
													<option value="distance">Distance</option>
													<option value="popularity">Popularity</option>
													<option value="averageProductPrice">Average Product Price</option>
													<option value="deliveryCosts">Delivery Costs</option>
													<option value="minCost">Minimum Cost</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- restaurants list goes here-->
			<div class="row" id="restaurants_list_results"> </div>
			<!--<div class="row" id="restaurants_list_results"> -->
			<!-- restaurants list goes here-->
			<div class="go-top-btn"> <a href="" class="m-btn btn-link" onclick="window.scrollTo({ top: 0, behavior: 'smooth' });return false;">Go To Top</a> </div>
		</div>
	</section>
</body>

<script type="module" src="./js/app.js"></script>
</html>