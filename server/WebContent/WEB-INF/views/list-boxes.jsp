<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head><%@ page isELIgnored="false" %>
	<meta charset="ISO-8859-1">
	<title>Box - List</title>	
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>	
</head>
<body>
	<div class="container">
		<div class="col-md-offset-1 col-md-10">
			<br/><br/>
			<div class="panel">
				<div class="panel-heading">
					<h3>Box List</h3>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-bordered">
					<tr>
						<th>Name</th>
						<th>Weight</th>
						<th>Color</th>
						<th>Destination</th>
						<th>Price</th>
						<th>Action</th>
					</tr>
					<c:forEach var="tempBox" items="${boxes}">
						<!-- construct an "update" link with customer id -->
						<c:url var="updateLink" value="/boxes/edit">
							<c:param name="id" value="${tempBox.id}" />
						</c:url>

						<!-- construct an "delete" link with customer id -->
						<c:url var="deleteLink" value="/boxes/delete">
							<c:param name="id" value="${tempBox.id}" />
						</c:url>
						<tr>
							<td>${tempBox.getName()}</td>
							<td>${tempBox.getWeight()}</td>
							<td>${tempBox.getColor()}</td>
							<td>${tempBox.getDestination().getName()}</td>
							<td>${tempBox.getPrice()}</td>
							<td>
								<a href="${updateLink}">Update</a> |
								<a href="${deleteLink}" onclick="if (!(confirm('Are you sure you want to delete this box?'))) return false">Delete</a>
							</td>

						</tr>
					</c:forEach>
					</table>
					<input type="button" value="Add box" onclick="window.location.href='add'; return false;" class="btn btn-primary" />
				</div>
			</div>
		</div>
	</div>
</body>
</html>
