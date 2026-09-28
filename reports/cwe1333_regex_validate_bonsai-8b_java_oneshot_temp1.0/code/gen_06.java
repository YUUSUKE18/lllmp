import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean inNumberList = false;
        if (line != null) {
            line = line.trim();
            if (!line.isEmpty()) {
                for (String token : line.split(",")) {
                    token = token.trim();
                    if (!token.isEmpty() && token.matches("\\d+")) {
                        validCount++;
                        inNumberList = true;
                    } else if (token.matches("\\d+")) {
                        inNumberList = false;
                    } else {
                        inNumberList = false;
                    }
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
