package boxinator.repositories;

import java.util.List;

import boxinator.entities.Box;

public interface IBoxRepository {
	
	public List<Box> find();

	public void save(Box box);

	public Box find(int id);

	public void delete(int id);
}