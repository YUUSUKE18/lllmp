import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = Integer.parseInt(targetLine);
        String nextLine = br.readLine();
        int count = 0;
        while (nextLine != null && !nextLine.trim().isEmpty()) {
            String[] parts = nextLine.split("\\s+");
            for (int i = 0; i < parts.length; i++) {
                if (!parts[i].trim().isEmpty()) {
                    int num = Integer.parseInt(parts[i]);
                    if (count >= 2) break;
                    for (int j = i + 1; j < parts.length && count < 2; j++) {
                        if (!parts[j].trim().isEmpty()) {
                            int otherNum = Integer.parseInt(parts[j]);
                            if (num + otherNum == target) {
                                count++;
                                break;
                            }
                        }
                    }
                }
            }
            nextLine = br.readLine();
        }
        System.out.println("pairs=" + count);
    }
}
