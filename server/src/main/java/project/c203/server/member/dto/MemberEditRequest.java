package project.c203.server.member.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Data
public class MemberEditRequest {

    @NotNull
    private String memberPassword;

    @Nullable
    private String memberSchool;

    @Nullable
    private String memberNewPassword;
}
