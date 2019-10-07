package boxinator.services;

import java.util.List;

import boxinator.entities.Destination;

public interface IDestinationService {

	public List<Destination> find();

	public void save(Destination destination);

	public Destination find(String countryCode);

	public void delete(String countryCode);
}
