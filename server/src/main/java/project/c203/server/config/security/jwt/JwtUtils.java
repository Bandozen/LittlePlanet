package project.c203.server.config.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private final JwtConfig jwtConfig;
    private final Key key;

    @Autowired
    public JwtUtils(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public String generateToken(String memberEmail, Integer memberSeq) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (long) jwtConfig.getTokenExpiration() * 1000);

        return Jwts.builder()
                .setSubject("authorization")
                .claim("memberEmail", memberEmail)
                .claim("memberSeq", memberSeq)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {

        String tokenWithoutBearer = token.replace("Bearer ", "");

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(tokenWithoutBearer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getMemberEmailFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } else {
            return null;
        }
    }

    public String extractJwtTokenFromRequest(HttpServletRequest request) {
        String headerValue = request.getHeader("Authorization");
        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            return headerValue.substring(7);
        }
        return null;
    }

}
