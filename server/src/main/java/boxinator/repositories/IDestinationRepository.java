package boxinator.repositories;

import java.util.List;

import boxinator.entities.Destination;

public interface IDestinationRepository {

	public List<Destination> find();

	public void save(Destination destination);

	public Destination find(String countryCode);

	public void delete(String countryCode);
}
