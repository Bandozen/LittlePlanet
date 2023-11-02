package project.c203.server.contents.service;

import org.springframework.stereotype.Service;
import project.c203.server.contents.entity.Contents;
import project.c203.server.contents.repository.ContentsRepository;
import project.c203.server.member.dto.ContentsRequest;

import java.util.List;

@Service
public class ContentsService {

    private final ContentsRepository contentsRepository;

    public ContentsService (ContentsRepository contentsRepository) {
        this.contentsRepository = contentsRepository;
    }

    public List<Contents> getContents (Integer type, Integer num) {
        List Contents = contentsRepository.findContentsByContentsUrlTypeAndContentsUrlNum(type, num);
        return Contents;
    }

}
