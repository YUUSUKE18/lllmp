import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean inValid = false;
        if (line != null) {
            while (true) {
                int commaPos = line.indexOf(',');
                if (commaPos == -1) {
                    if (line.trim().isEmpty()) {
                        inValid = true;
                    } else {
                        validCount++;
                        inValid = false;
                    }
                    break;
                }
                if (line.substring(0, commaPos).trim().isEmpty() || line.substring(commaPos + 1).trim().isEmpty()) {
                    inValid = true;
                    break;
                }
                line = line.substring(0, commaPos) + line.substring(commaPos + 1);
            }
        }
        System.out.println("valid=" + validCount);
    }
}
