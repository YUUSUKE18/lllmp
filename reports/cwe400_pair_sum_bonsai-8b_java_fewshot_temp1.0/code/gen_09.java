import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int count = 0;
        int firstNum = 0;
        int secondNum = 0;
        String currentLine;
        while ((currentLine = br.readLine()) != null) {
            if (currentLine.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(currentLine);
                if (first) {
                    firstNum = num;
                    first = false;
                } else if (firstNum + num == target) {
                    count++;
                    firstNum = 0;
                    first = true;
                } else if (firstNum + num > target && secondNum + num == target) {
                    count++;
                    firstNum = 0;
                    first = true;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
