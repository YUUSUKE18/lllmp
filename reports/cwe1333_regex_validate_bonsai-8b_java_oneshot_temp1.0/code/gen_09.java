import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                if (f.contains(",")) {
                    valid++;
                    if (!first) {
                        first = false;
                    }
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
