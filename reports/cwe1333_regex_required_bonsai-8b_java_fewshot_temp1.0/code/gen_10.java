import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        if (line != null) {
            if (line.trim().matches("^\\d+(?:,\\d+)*$")) valid++;
        }
        System.out.println("valid=" + valid);
    }
}
