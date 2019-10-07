<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Box - Form</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>	
</head>
<body>
	<div class="container">
	
		<div class="col-md-offset-2 col-md-6">
		
			<br/><br/>
			
			<div class="panel">
				<div class="panel-heading">
					<h3>Add Box</h3>
				</div>
				<div class="panel-body">
					<form:form action="save" id="box-form" cssClass="form-horizontal" method="post" modelAttribute="box">

						<!-- need to associate this data with customer id -->
						<form:hidden path="id" />

						<div class="form-group">
							<label for="Name" class="col-md-3 control-label">Name</label>
							<div class="col-md-9">
								<form:input path="Name" id="Name" cssClass="form-control" aria-describedby="nameHelp" placeholder="Enter name"/>
								<small id="nameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
							</div>
						</div>
						<div class="form-group">
							<label for="Weight" class="col-md-3 control-label">Weight</label>
							<div class="col-md-9">
								<form:input path="Weight" cssClass="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label for="Color" class="col-md-3 control-label">Color</label>
							<div class="col-md-9">
								<form:input path="Color" cssClass="form-control" />
							</div>
						</div>
						<div class="form-group">
							<label for="Destination" class="col-md-3 control-label">Destination</label>
							<div class="col-md-9">
								<form:select path="CountryCode" items="${destinations}" itemValue="CountryCode" itemLabel="Name" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-offset-3 col-md-9">
								<input type="button" value="Save" onclick="document.getElementById('box-form').submit();" class="btn btn-primary" />
								<input type="button" value="Cancel" onclick="window.location.href='list'; return false;" class="btn btn-secondary" />
							</div>
						</div>
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
