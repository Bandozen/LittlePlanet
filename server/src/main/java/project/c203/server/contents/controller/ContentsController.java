package project.c203.server.contents.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.c203.server.contents.entity.Contents;
import project.c203.server.contents.service.ContentsService;
import project.c203.server.member.dto.ContentsRequest;
import project.c203.server.member.dto.ContentsResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contents")
public class ContentsController {
    private final ContentsService contentsService;

    public ContentsController (ContentsService contentsService) {
        this.contentsService = contentsService;
    }

    @GetMapping
    public ResponseEntity<List<Contents>> getContents(@RequestParam Integer type, Integer num) {
        List Contents = contentsService.getContents(type, num);
        return ResponseEntity.ok(Contents);
    }
}
