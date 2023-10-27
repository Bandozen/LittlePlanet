package project.c203.server.member.dto;

import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
public class MemberAuthcodeRequest {
    @NotNull
    private String emailAddress;

    @NotNull
    private String authcode;

}
