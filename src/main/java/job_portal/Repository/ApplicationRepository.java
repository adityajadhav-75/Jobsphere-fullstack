package job_portal.Repository;

import job_portal.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJobSeekerId(Long jobSeekerId);

    List<Application> findByJobId(Long jobId);
}