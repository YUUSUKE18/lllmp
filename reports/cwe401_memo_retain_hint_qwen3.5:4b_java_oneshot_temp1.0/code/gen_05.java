import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long totalSteps = 0;
        String line;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            for (String part : line.trim().split("\\s+")) {
                if (part.isEmpty()) {
                    continue;
                }
                try {
                    int n = Integer.parseInt(part);
                    if (!memo.containsKey(n)) {
                        long tempN = n;
                        int steps = 0;

                        while (tempN != 1) {
                            if (memo.containsKey(tempN)) {
                                break;
                            }
                            if ((tempN & 1) == 0) {
                                tempN = tempN / 2;
                            } else {
                                tempN = 3L * tempN + 1;
                            }
                            steps++;
                        }

                        int currentSteps = steps;
                        for (int i = n, count = 0; i >= 1; count++, i--) {
                            memo.put(i, count);
                        }
                        if (n == 1) {
                            currentSteps = 0;
                        } else {
                            currentSteps = steps - memo.get((int)tempN);
                        }

                        totalSteps += currentSteps;
                    } else {
                        totalSteps += memo.get(n);
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
