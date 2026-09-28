import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        if (line != null) {
            if (line.trim().matches("\\S+\\s*,"?)) validCount++;
            if (line.trim().matches("\\S+\\s*,$?")) validCount++;
            if (line.trim().matches("\\S+")) validCount++;
        }
        System.out.println("valid=" + validCount);
    }
}
