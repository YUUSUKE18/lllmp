import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split("\\s+")) {
                if (s.isEmpty()) continue;
                if (s.contains(",")) {
                    valid++;
                    first = false;
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
