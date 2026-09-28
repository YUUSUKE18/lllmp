import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = Integer.parseInt(line);
        int count = 0;
        int num = 0;
        int positions = new int[100];
        int idx = 0;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                num = Integer.parseInt(line);
                idx++;
                if (num == target) {
                    for (int i = 0; i < idx; i++) {
                        if (positions[i] == -1) {
                            positions[i] = i;
                        }
                    }
                    for (int i = 0; i < idx; i++) {
                        for (int j = i + 1; j < idx; j++) {
                            if (positions[i] != -1 && positions[j] != -1 && positions[i] != positions[j] && num1 == target && num2 == target) {
                                count++;
                                break;
                            }
                        }
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
