package project.c203.server.simulationHistory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.c203.server.simulationHistory.entity.SimulationHistory;

@Repository
public interface SimulationHistoryRepository extends JpaRepository<SimulationHistory, Integer> {
    boolean existsSimulationHistoryBySimulationSeqAndAndStudent_StudentSeq(Integer simulationSeq, Integer studentSeq);
}
