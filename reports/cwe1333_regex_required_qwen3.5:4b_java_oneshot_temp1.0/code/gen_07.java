import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int count = 0;
        while ((line = br.readLine()) != null) {
            if (line.matches(".*[\\d,]+.*")) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
