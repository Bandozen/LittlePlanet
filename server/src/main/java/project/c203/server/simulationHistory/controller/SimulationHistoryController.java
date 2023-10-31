package project.c203.server.simulationHistory.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.c203.server.simulationHistory.dto.SimulationHistoryRequest;
import project.c203.server.simulationHistory.dto.SimulationHistoryResponse;
import project.c203.server.simulationHistory.repository.SimulationHistoryRepository;
import project.c203.server.simulationHistory.service.SimulationHistoryService;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/simulationHistory")
public class SimulationHistoryController {
    private final SimulationHistoryService simulationHistoryService;

    public SimulationHistoryController(SimulationHistoryService simulationHistoryService) {
        this.simulationHistoryService = simulationHistoryService;
    }

    @GetMapping
    public ResponseEntity<SimulationHistoryResponse> getHistory (@RequestBody SimulationHistoryRequest simulationHistoryRequest) {
        boolean isExisted = simulationHistoryService.getHistory(simulationHistoryRequest);
        if (isExisted) {
            return ResponseEntity.ok(new SimulationHistoryResponse(true, "해당 학생은 이 시뮬레이션에 이미 참여하였습니다."));
        } else {
            return ResponseEntity.ok(new SimulationHistoryResponse(false, "해당 학생은 이 시뮬레이션에 참여한 적이 없습니다."));
        }
    }

    @PostMapping
    public ResponseEntity<SimulationHistoryResponse> createHistory (@RequestBody SimulationHistoryRequest simulationHistoryRequest, Authentication authentication) {
        try {
            simulationHistoryService.createHistory(simulationHistoryRequest, authentication);
            return ResponseEntity.ok(new SimulationHistoryResponse(true, "히스토리가 생성되었습니다."));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new SimulationHistoryResponse(false, "학생 또는 시뮬레이션 seq 확인"));
        }
    }

}
