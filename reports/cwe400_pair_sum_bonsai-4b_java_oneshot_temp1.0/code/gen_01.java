import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        int count = 0;
        BufferedReader secondLine = new BufferedReader(new InputStreamReader(System.in));
        String secondLineLine = null;
        while (secondLineLine = secondLine.readLine() != null) {
            secondLineLineLine = secondLine.readLine();
            if (secondLineLineLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(secondLineLineLine.trim());
                if (n + target == target) count++;
            } catch (NumberFormatException e) {
            }
            if (count >= 2) break;
        }
        System.out.println("pairs=" + count);
    }
}
