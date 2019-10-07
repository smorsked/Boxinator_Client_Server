package boxinator.repositories;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import boxinator.entities.Destination;

@Repository
public class DestinationRepository implements IDestinationRepository {

	@Autowired
    private SessionFactory sessionFactory;
	
	@Override
	public Destination find(String countryCode) {
		Session currentSession = sessionFactory.getCurrentSession();
		Destination destination = currentSession.get(Destination.class, countryCode);
		return destination;
	}
	
	@Override
	public List<Destination> find() {
		Session session = sessionFactory.getCurrentSession();
		CriteriaBuilder cb = session.getCriteriaBuilder();
		CriteriaQuery<Destination> cq = cb.createQuery(Destination.class);
		Root<Destination> root = cq.from(Destination.class);
		cq.select(root);
		Query query = session.createQuery(cq);
		return query.getResultList();
	}
	
	@Override
	public void delete(String countryCode) {
		Session session = sessionFactory.getCurrentSession();
		Destination destination = session.byId(Destination.class).load(countryCode);
		session.delete(destination);
	}
		
    @Override
    public void save(Destination destination) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.saveOrUpdate(destination);
    }
	
}
