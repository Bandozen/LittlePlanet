package project.c203.server.member.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class MemberEditRequest {

    @NotNull
    private String memberPassword;

    @Nullable
    private String memberSchool;

    @Nullable
    private String memberNewPassword;
}
