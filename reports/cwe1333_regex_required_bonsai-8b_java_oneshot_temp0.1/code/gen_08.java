import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean validLine = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) return;
            if (line.matches(".*,.*.*")) {
                validLine = true;
                valid = 1;
            } else if (line.matches(".*,.*")) {
                validLine = true;
                valid = 2;
            } else if (line.matches(".*,.*.*,.*")) {
                validLine = true;
                valid = 3;
            } else if (line.matches(".*,.*.*,.*")) {
                validLine = true;
                valid = 4;
            } else if (line.matches(".*,.*.*,.*,.*")) {
                validLine = true;
                valid = 5;
            } else if (line.matches(".*,.*.*,.*,.*")) {
                validLine = true;
                valid = 6;
            } else if (line.matches(".*,.*.*,.*,.*,.*")) {
                validLine = true;
                valid = 7;
            } else if (line.matches(".*,.*.*,.*,.*,.*,.*")) {
                validLine = true;
                valid = 8;
            } else if (line.matches(".*,.*.*,.*,.*,.*,.*,.*")) {
                validLine = true;
                valid = 9;
            } else if (line.matches(".*,.*.*,.*,.*,.*,.*,.*,.*")) {
                validLine = true;
                valid = 10;
            }
        }
        System.out.println("valid=" + valid);
    }
}
