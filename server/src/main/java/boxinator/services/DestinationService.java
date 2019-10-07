package boxinator.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import boxinator.entities.Destination;
import boxinator.repositories.IDestinationRepository;

@Service
public class DestinationService implements IDestinationService {
	
	@Autowired
    private IDestinationRepository repository;

	@Override
	@Transactional
	public Destination find(String countryCode) {
		return repository.find(countryCode);
	}
	
	@Override
	@Transactional
	public List<Destination> find() {
		return repository.find();
	}
	
    @Override
    @Transactional
    public void save(Destination destination) {
    	repository.save(destination);
    }
    
    @Override
	@Transactional
	public void delete(String countryCode) {
    	repository.delete(countryCode);
	}    
}
