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
            if (!line.isEmpty() && line.matches("[0-9,]+")) {
                validLine = true;
                valid = 1;
            } else if (line.contains("0,0,0")) {
                valid = 3;
            } else if (line.contains("0,1,2")) {
                valid = 3;
            } else if (line.contains("1,1,1")) {
                valid = 3;
            } else if (line.matches("1,1,1,1")) {
                valid = 4;
            } else if (line.matches("1,1,1,1,1")) {
                valid = 5;
            } else if (line.matches("1,1,1,1,1,1")) {
                valid = 6;
            } else if (line.matches("1,1,1,1,1,1,1")) {
                valid = 7;
            } else if (line.matches("1,1,1,1,1,1,1,1")) {
                valid = 8;
            } else if (line.matches("1,1,1,1,1,1,1,1,1")) {
                valid = 9;
            }
        }
        System.out.println("valid=" + valid);
    }
}
