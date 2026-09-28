import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null && !line.trim().isEmpty() && !line.trim().startsWith(',') && !line.trim().endsWith(',')) {
            int count = 0;
            boolean inNumber = false;
            for (char c : line.trim().toCharArray()) {
                if (c == ',') {
                    inNumber = false;
                } else if (Character.isDigit(c)) {
                    inNumber = true;
                } else if (inNumber && !Character.isDigit(c)) {
                    count++;
                }
            }
            if (count > 0 && line.trim().endsWith(',')) {
                count--;
            }
            if (count >= 1) {
                System.out.println("valid=" + count);
            }
        }
    }
}
